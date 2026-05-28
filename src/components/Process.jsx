import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeUp, stagger } from '../animations/reveal';

const STEPS = [
  {
    title: 'Research',
    description:
      'Discovery interviews, audits, and reference gathering. We define what to make, who it serves, and what success looks like.',
    bullets: ['Brand audit', 'Competitive review', 'Mood & references'],
  },
  {
    title: 'Concept',
    description:
      'Three distinct directions, presented with care. We pick a path together — and sharpen until it sings.',
    bullets: ['Strategy', 'Direction sprints', 'Type & color systems'],
  },
  {
    title: 'Design',
    description:
      'Visual systems are designed in-context across every touchpoint. Iteration, not opinion, drives decisions.',
    bullets: ['Identity', 'Collateral', 'Motion & web'],
  },
  {
    title: 'Delivery',
    description:
      'Production-ready files, robust guidelines, and a handover that empowers your team to keep the work alive.',
    bullets: ['Guidelines', 'Asset library', 'Roll-out support'],
  },
];

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 20%'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="process" ref={ref} className="relative py-28 md:py-36">
      <div className="container-x">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
          variants={stagger(0.08)}
          className="mb-16 max-w-2xl md:mb-20"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            How we work
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-title mt-4">
            A calm, confident{' '}
            <span className="font-serif italic">process.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-base leading-relaxed text-ink/70 md:text-lg"
          >
            Four phases, no surprises. Each step ends with a clear deliverable
            and a shared decision — so we always know where we are.
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Spine */}
          <div className="pointer-events-none absolute left-5 top-0 hidden h-full w-px bg-ink/10 md:left-1/2 md:block">
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-0 top-0 w-px origin-top bg-ink"
            />
          </div>

          <ul className="relative grid gap-10 md:gap-14">
            {STEPS.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-15%' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative md:grid md:grid-cols-2 md:items-center md:gap-12"
                >
                  {/* Marker */}
                  <span className="absolute left-5 top-2 z-10 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-ink ring-8 ring-canvas md:left-1/2">
                    <span className="absolute h-7 w-7 rounded-full bg-accent/40" />
                  </span>

                  <div
                    className={`pl-12 md:pl-0 ${
                      isLeft ? 'md:col-start-1 md:text-right' : 'md:col-start-2'
                    }`}
                  >
                    <div className="card-soft inline-block max-w-md text-left">
                      <div className="flex justify-end">
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-ink">
                          ✦
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink/70">
                        {step.description}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {step.bullets.map((b) => (
                          <li
                            key={b}
                            className="rounded-full border border-ink/10 bg-canvas/70 px-3 py-1 text-xs font-medium text-ink/70"
                          >
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
