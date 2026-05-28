import { useEffect, useState } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * useParallax
 * Returns a smoothed Y motion value mapped to scroll progress over a target ref.
 *
 * @param {React.RefObject} ref     element to track
 * @param {number} distance         total px to translate across the section (default 120)
 * @param {string} offsetStart      e.g. 'start end'
 * @param {string} offsetEnd        e.g. 'end start'
 */
export function useParallax(
  ref,
  distance = 120,
  offsetStart = 'start end',
  offsetEnd = 'end start'
) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [offsetStart, offsetEnd],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-distance / 2, distance / 2]);
  return useSpring(y, { stiffness: 80, damping: 20, mass: 0.4 });
}

/**
 * Magnetic hover effect for interactive elements.
 * Returns a ref + handlers + a transform style.
 */
export function useMagnetic(strength = 0.35) {
  const [transform, setTransform] = useState('translate3d(0,0,0)');

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTransform(`translate3d(${x * strength}px, ${y * strength}px, 0)`);
  };
  const onLeave = () => setTransform('translate3d(0,0,0)');

  return { onMouseMove: onMove, onMouseLeave: onLeave, style: { transform } };
}

/**
 * Persisted scroll position hook (for cheap parallax fallbacks).
 */
export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return y;
}
