import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const isHoverCapable = () => {
  if (typeof window === 'undefined') return false;
  return !window.matchMedia('(hover: none)').matches;
};

export default function CursorGlow() {
  const [enabled] = useState(isHoverCapable);
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;

    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e) => {
      if (e.target.closest('a, button, [role="tab"]')) setHover(true);
    };
    const onOut = (e) => {
      if (e.target.closest('a, button, [role="tab"]')) setHover(false);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      animate={{
        x: pos.x - (hover ? 24 : 12),
        y: pos.y - (hover ? 24 : 12),
        scale: hover ? 2.2 : 1,
        opacity: hover ? 0.7 : 0.45,
      }}
      transition={{ type: 'spring', stiffness: 320, damping: 30, mass: 0.4 }}
      className="pointer-events-none fixed left-0 top-0 z-[55] h-6 w-6 rounded-full bg-accent mix-blend-multiply blur-[2px]"
    />
  );
}
