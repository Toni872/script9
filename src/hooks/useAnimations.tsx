/**
 * Script9 Animation Hooks
 * Hooks personalizados para animaciones profesionales
 */

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { SPRING_CONFIGS } from '@/utils/animations';

// ============================================
// SCROLL ANIMATIONS
// ============================================

/**
 * Hook para detectar cuando un elemento está visible en viewport
 * @param threshold - Porcentaje del elemento visible (0-1)
 * @param triggerOnce - Si debe animar solo una vez
 */
export function useScrollAnimation(threshold: number = 0.1, triggerOnce: boolean = true) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once: triggerOnce,
  });

  return { ref, isInView };
}

/**
 * Hook para animaciones de scroll con múltiples opciones
 */
export function useScrollReveal(options?: {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
}) {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const isInView = useInView(ref, {
    amount: options?.threshold || 0.1,
    once: options?.triggerOnce !== false,
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      if (options?.delay) {
        setTimeout(() => setHasAnimated(true), options.delay);
      } else {
        setHasAnimated(true);
      }
    }
  }, [isInView, hasAnimated, options?.delay]);

  return {
    ref,
    isInView,
    controls: {
      initial: 'hidden',
      animate: hasAnimated ? 'visible' : 'hidden',
    },
  };
}

// ============================================
// PARALLAX EFFECT
// ============================================

/**
 * Hook para crear efecto parallax en scroll
 * @param speed - Velocidad del efecto (0.1 = lento, 1 = rápido)
 */
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollY = useMotionValue(0);
  const y = useTransform(scrollY, [0, 1000], [0, speed * 1000]);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrollProgress = window.scrollY;
        scrollY.set(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  return { ref, y };
}

// ============================================
// MOUSE TRACKING
// ============================================

/**
 * Hook para seguimiento del mouse (magnetic effect)
 */
export function useMouseTracking(strength: number = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const x = useSpring(0, SPRING_CONFIGS.smooth);
  const y = useSpring(0, SPRING_CONFIGS.smooth);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      x.set(deltaX);
      y.set(deltaY);

      setMousePosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      setMousePosition({ x: 0, y: 0 });
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [strength, x, y]);

  return { ref, x, y, mousePosition };
}

// ============================================
// NUMBER COUNTER ANIMATION
// ============================================

/**
 * Hook para animar números (counters)
 * @param end - Número final
 * @param duration - Duración en ms
 * @param start - Número inicial
 */
export function useCountUp(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true);
      let startTime: number;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        // Easing function (easeOutQuad)
        const easeProgress = progress * (2 - progress);
        const currentCount = Math.floor(start + (end - start) * easeProgress);

        setCount(currentCount);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [end, duration, start, isInView, isVisible]);

  return { ref, count };
}

// ============================================
// RIPPLE EFFECT
// ============================================

/**
 * Hook para efecto ripple en clicks
 */
export function useRipple() {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const createRipple = (event: React.MouseEvent<HTMLElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 600);
  };

  return { ripples, createRipple };
}

// ============================================
// SMOOTH SCROLL
// ============================================

/**
 * Hook para smooth scroll a secciones
 */
export function useSmoothScroll() {
  const scrollTo = (elementId: string, offset: number = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }
  };

  return { scrollTo };
}

// ============================================
// HOVER 3D TILT
// ============================================

/**
 * Hook para efecto 3D tilt en hover
 */
export function useTilt(intensity: number = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * intensity;
    const rotateY = ((centerX - x) / centerX) * intensity;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return {
    ref,
    tilt,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
}

// ============================================
// INTERSECTION OBSERVER (múltiples elementos)
// ============================================

/**
 * Hook para observar múltiples elementos
 */
export function useIntersectionObserver(
  elements: React.RefObject<Element>[],
  options?: IntersectionObserverInit
) {
  const [entries, setEntries] = useState<Map<Element, IntersectionObserverEntry>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver((observedEntries) => {
      setEntries((prev) => {
        const next = new Map(prev);
        observedEntries.forEach((entry) => {
          next.set(entry.target, entry);
        });
        return next;
      });
    }, options);

    elements.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [elements, options]);

  return entries;
}

// ============================================
// STAGGER ANIMATION
// ============================================

/**
 * Hook para generar delays escalonados en listas
 */
export function useStagger(itemCount: number, baseDelay: number = 0.1) {
  const getDelay = (index: number) => index * baseDelay;

  return { getDelay };
}

// ============================================
// SCROLL PROGRESS
// ============================================

/**
 * Hook para tracking de progreso de scroll
 */
export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
}

export default {
  useScrollAnimation,
  useScrollReveal,
  useParallax,
  useMouseTracking,
  useCountUp,
  useRipple,
  useSmoothScroll,
  useTilt,
  useIntersectionObserver,
  useStagger,
  useScrollProgress,
};

