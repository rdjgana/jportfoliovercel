import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CONTACT_EMAIL } from '../constants/contact';

const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-16">
      {/* Animated divider */}
      <div className="container-x">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-px origin-left bg-gradient-to-r from-transparent via-ink/30 to-transparent"
        />
      </div>

      {/* Big mark */}
      <div className="container-x py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow">Studio — est. 2017</p>
            <h3 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
              An independent design practice for{' '}
              <span className="font-serif italic text-ink/85">considered</span>{' '}
              <span className="text-accent">brands.</span>
            </h3>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/70 md:text-lg">
              Brand systems, editorial, and visual identity — built with rigor,
              shipped with care.
            </p>
          </div>

          <div className="md:col-span-5 md:pt-3">
            <ul className="grid grid-cols-2 gap-y-2 gap-x-6">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 py-1.5 text-sm font-medium text-ink/80 transition-colors hover:text-ink"
                  >
                    <span className="h-px w-3 bg-ink/30 transition-all duration-300 group-hover:w-6 group-hover:bg-ink" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-ink/10 bg-white/45 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-ink/55">
                For new enquiries
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-1 block font-display text-xl font-semibold tracking-tight"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="top"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-ink text-canvas shadow-soft transition-colors hover:bg-accent hover:text-ink md:bottom-8 md:right-8"
          >
            <span className="text-xl leading-none">↑</span>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
