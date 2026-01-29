/**
 * Script9 Animation System
 * Sistema de animaciones profesionales con Framer Motion
 * Colores según Manual de Marca: #B502CE (Script9 Magenta)
 */

import { Variants, Transition } from 'framer-motion';

// ============================================
// TRANSICIONES BASE
// ============================================

export const SPRING_CONFIGS = {
  // Bouncy - Para elementos destacados
  bouncy: {
    type: 'spring' as const,
    damping: 10,
    stiffness: 100,
  },
  // Smooth - Para transiciones generales
  smooth: {
    type: 'spring' as const,
    damping: 20,
    stiffness: 120,
  },
  // Snappy - Para microinteracciones rápidas
  snappy: {
    type: 'spring' as const,
    damping: 25,
    stiffness: 300,
  },
  // Gentle - Para elementos grandes
  gentle: {
    type: 'spring' as const,
    damping: 30,
    stiffness: 100,
  },
};

export const EASING = {
  easeInOut: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number],
  easeOut: [0.19, 1.0, 0.22, 1.0] as [number, number, number, number],
  easeIn: [0.42, 0, 1.0, 1.0] as [number, number, number, number],
  bounce: [0.68, -0.6, 0.32, 1.6] as [number, number, number, number],
};

// ============================================
// FADE ANIMATIONS
// ============================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASING.easeOut },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: SPRING_CONFIGS.smooth,
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: SPRING_CONFIGS.smooth,
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: SPRING_CONFIGS.smooth,
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: SPRING_CONFIGS.smooth,
  },
};

// ============================================
// SCALE ANIMATIONS
// ============================================

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: SPRING_CONFIGS.bouncy,
  },
};

export const scaleInCenter: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: SPRING_CONFIGS.bouncy,
  },
};

// ============================================
// HOVER EFFECTS
// ============================================

export const hoverScale: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: SPRING_CONFIGS.snappy,
  },
  tap: {
    scale: 0.95,
    transition: SPRING_CONFIGS.snappy,
  },
};

export const hoverLift: Variants = {
  rest: {
    y: 0,
    boxShadow: '0 4px 6px -1px rgba(181, 2, 206, 0.15)',
  },
  hover: {
    y: -8,
    boxShadow: '0 20px 25px -5px rgba(181, 2, 206, 0.25)',
    transition: SPRING_CONFIGS.smooth,
  },
};

export const hoverGlow: Variants = {
  rest: {
    boxShadow: '0 0 0 rgba(181, 2, 206, 0)',
  },
  hover: {
    boxShadow: '0 0 30px rgba(181, 2, 206, 0.6)',
    transition: { duration: 0.3 },
  },
};

// ============================================
// BUTTON ANIMATIONS
// ============================================

export const buttonPress: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: SPRING_CONFIGS.snappy,
  },
  tap: {
    scale: 0.97,
    transition: SPRING_CONFIGS.snappy,
  },
};

export const buttonGradientShift: Variants = {
  rest: {
    backgroundPosition: '0% 50%',
  },
  hover: {
    backgroundPosition: '100% 50%',
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};

// ============================================
// CARD ANIMATIONS
// ============================================

export const cardHover: Variants = {
  rest: {
    y: 0,
    rotateX: 0,
    rotateY: 0,
  },
  hover: {
    y: -10,
    transition: SPRING_CONFIGS.smooth,
  },
};

export const cardImageZoom: Variants = {
  rest: {
    scale: 1,
    rotate: 0,
  },
  hover: {
    scale: 1.1,
    rotate: 2,
    transition: { duration: 0.7, ease: EASING.easeOut },
  },
};

// ============================================
// STAGGER ANIMATIONS
// ============================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: SPRING_CONFIGS.smooth,
  },
};

// ============================================
// PAGE TRANSITIONS
// ============================================

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASING.easeOut },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: EASING.easeIn },
  },
};

export const slideTransition: Variants = {
  initial: { x: 100, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: SPRING_CONFIGS.smooth,
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

// ============================================
// MODAL ANIMATIONS
// ============================================

export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, delay: 0.1 },
  },
};

export const modalContent: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: SPRING_CONFIGS.bouncy,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.2 },
  },
};

// ============================================
// LOADING ANIMATIONS
// ============================================

export const shimmer: Variants = {
  initial: {
    backgroundPosition: '-200% 0',
  },
  animate: {
    backgroundPosition: '200% 0',
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

export const pulseGlow: Variants = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(181, 2, 206, 0.3)',
      '0 0 40px rgba(181, 2, 206, 0.6)',
      '0 0 20px rgba(181, 2, 206, 0.3)',
    ],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

// ============================================
// SCROLL ANIMATIONS
// ============================================

export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: SPRING_CONFIGS.smooth,
  },
};

export const scrollScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: SPRING_CONFIGS.bouncy,
  },
};

// ============================================
// NUMBER COUNTER ANIMATION
// ============================================

export const counterAnimation = {
  duration: 2,
  ease: 'easeOut',
};

// ============================================
// HEART/FAVORITE ANIMATION
// ============================================

export const heartBeat: Variants = {
  rest: { scale: 1 },
  active: {
    scale: [1, 1.3, 0.9, 1.1, 1],
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
};

// ============================================
// RIPPLE EFFECT (para clicks)
// ============================================

export const rippleEffect: Variants = {
  initial: {
    opacity: 0.5,
    scale: 0,
  },
  animate: {
    opacity: 0,
    scale: 2,
    transition: {
      duration: 0.6,
      ease: EASING.easeOut,
    },
  },
};

// ============================================
// MAGNETIC HOVER (botones premium)
// ============================================

export const magneticHover = (x: number, y: number, strength: number = 0.2) => ({
  x: x * strength,
  y: y * strength,
  transition: SPRING_CONFIGS.snappy,
});

// ============================================
// PARALLAX LAYERS
// ============================================

export const parallaxLayer = (speed: number) => ({
  y: speed,
  transition: {
    type: 'spring' as const,
    damping: 30,
    stiffness: 100,
  },
});

// ============================================
// GRADIENT ANIMATION
// ============================================

export const animatedGradient: Variants = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 5,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

export default {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  scaleInCenter,
  hoverScale,
  hoverLift,
  hoverGlow,
  buttonPress,
  cardHover,
  cardImageZoom,
  staggerContainer,
  staggerItem,
  pageTransition,
  slideTransition,
  modalBackdrop,
  modalContent,
  shimmer,
  pulseGlow,
  scrollReveal,
  scrollScale,
  heartBeat,
  rippleEffect,
  animatedGradient,
  SPRING_CONFIGS,
  EASING,
};

