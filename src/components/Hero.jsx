import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { wordVariant, stagger, fadeUp, easeOutQuint } from '../animations/reveal';
import { useMagnetic } from '../animations/parallax';

const HEADLINE_LINE_1 = ['Design', 'with', 'intent.'];
const HEADLINE_LINE_2 = ['Crafted', 'with', 'soul.'];

function MagneticButton({ children, variant = 'primary', href = '#' }) {
  const magnet = useMagnetic(0.3);
  const cls =
    variant === 'primary'
      ? 'btn-primary'
      : 'btn-ghost';
  return (
    <a href={href} {...magnet} className={`${cls} will-change-transform`}>
      <span className="inline-block">{children}</span>
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yShape1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yShape2 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const yShape3 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden pt-28 md:pt-32"
    >
      {/* Animated gradient blobs */}
      <motion.div
        style={{ y: yShape1 }}
        className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-accent/55 blur-3xl animate-blob"
      />
      <motion.div
        style={{ y: yShape2 }}
        className="pointer-events-none absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-accentSoft/70 blur-3xl animate-blob"
      />
      <motion.div
        style={{ y: yShape3 }}
        className="pointer-events-none absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
      />

      {/* Floating abstract shapes */}
      <motion.div
        style={{ y: yShape2 }}
        className="pointer-events-none absolute right-12 top-32 hidden h-24 w-24 rotate-12 rounded-3xl border border-ink/15 bg-white/40 backdrop-blur-md md:block"
      >
        <div className="absolute inset-3 rounded-2xl bg-accent/80 animate-floaty" />
      </motion.div>
      <motion.div
        style={{ y: yShape1 }}
        className="pointer-events-none absolute left-10 bottom-24 hidden h-16 w-16 rotate-[18deg] rounded-full border border-ink/15 bg-white/40 backdrop-blur-md md:block animate-floaty"
      />

      <div className="container-x relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0.06)}
          style={{ y: yText, opacity: opacityFade }}
          className="max-w-5xl"
        >
          <h1 className="font-display text-[14vw] font-semibold leading-[0.95] tracking-tight text-ink md:text-[8.5vw] lg:text-[7.4vw]">
            <span className="block overflow-hidden">
              <motion.span variants={stagger(0.07)} className="inline-flex flex-wrap gap-x-[0.22em]">
                {HEADLINE_LINE_1.map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden">
                    <motion.span
                      variants={wordVariant}
                      className="inline-block"
                    >
                      {w}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={stagger(0.07)} className="inline-flex flex-wrap items-center gap-x-[0.22em]">
                {HEADLINE_LINE_2.map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden">
                    <motion.span
                      variants={wordVariant}
                      className={`inline-block ${
                        w === 'soul.' ? 'font-serif italic font-normal' : ''
                      }`}
                    >
                      {w === 'soul.' ? (
                        <>
                          <span className="text-accent">soul</span>.
                        </>
                      ) : (
                        w
                      )}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            </span>
          </h1>

          <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
            <motion.p
              variants={fadeUp}
              className="text-balance max-w-xl text-base leading-relaxed text-ink/75 md:col-span-6 md:text-lg"
            >
              I'm <span className="font-medium text-ink">Jacintha F</span> — a
              graphic designer crafting brand systems, posters, brochures, and
              name boards for businesses and growing brands.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end"
            >
              <MagneticButton href="#portfolio" variant="primary">
                View work
              </MagneticButton>
              <MagneticButton href="#contact" variant="ghost">
                Start a project
              </MagneticButton>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8, ease: easeOutQuint }}
            className="mt-16 flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-ink/55"
          >
            <span className="relative flex h-9 w-5 items-center justify-center rounded-full border border-ink/30">
              <motion.span
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="block h-1.5 w-1.5 rounded-full bg-ink/60"
              />
            </span>
            Scroll to explore
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
