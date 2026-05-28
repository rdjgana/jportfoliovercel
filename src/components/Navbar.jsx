import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useActiveSection from '../hooks/useActiveSection';
import logoImage from '../assets/logo.jpeg';

const NAV_LINKS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Work', href: '#portfolio', id: 'portfolio' },
  { label: 'Process', href: '#process', id: 'process' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_LINKS.map((l) => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="container-x">
        <div
          className={`mt-3 flex items-center justify-between gap-3 rounded-full border border-ink/10 px-3 py-2 transition-all duration-500 sm:px-4 sm:py-2.5 md:mt-4 md:gap-4 md:px-5 md:py-3 lg:px-6 ${
            scrolled
              ? 'bg-canvas/75 shadow-soft backdrop-blur-xl'
              : 'bg-canvas/30 backdrop-blur-md'
          }`}
        >
          <a href="#home" className="group flex shrink-0 items-center gap-2.5">
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-ink text-canvas">
              <img 
                src={logoImage} 
                alt="Logo" 
                className="h-full w-full object-cover rounded-full"
              />
              <span className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
            </span>
            <span className="hidden font-display text-base font-semibold tracking-tight sm:block">
              Jacitha
            </span>
          </a>

          {/* Inline nav — only on lg+ where 7 links fit comfortably */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className="relative px-3.5 py-2 text-sm font-medium text-ink/75 transition-colors hover:text-ink"
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 -z-0 rounded-full bg-ink"
                      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors ${
                      isActive ? 'text-canvas' : ''
                    }`}
                  >
                    {link.label}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Right cluster: CTA (md+) + hamburger (until lg) */}
          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            <a
              href="#contact"
              className="group hidden items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-ink shadow-ring transition-all duration-300 hover:bg-ink hover:text-canvas md:inline-flex md:px-5 md:py-2.5"
            >
              Let's talk
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </a>

            <button
              onClick={() => setOpen((s) => !s)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 bg-white/40 transition-colors hover:bg-white/65 lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 top-0 h-[2px] w-full bg-ink transition-all duration-300 ${
                    open ? 'translate-y-[5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[2px] w-full bg-ink transition-all duration-300 ${
                    open ? '-translate-y-[5px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="container-x mt-3 lg:hidden"
          >
            <div className="rounded-3xl border border-ink/10 bg-canvas/95 p-4 shadow-soft backdrop-blur-xl md:p-5">
              <nav className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-x-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                      active === link.id
                        ? 'bg-ink text-canvas'
                        : 'text-ink hover:bg-ink/5'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {link.label}
                    </span>
                    <span className="text-sm opacity-60">↗</span>
                  </a>
                ))}
              </nav>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
