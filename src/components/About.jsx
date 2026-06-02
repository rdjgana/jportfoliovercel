import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeUp, stagger, slideInLeft, slideInRight } from '../animations/reveal';
import AnimatedCounter from './AnimatedCounter';
import logoImage from '../assets/logo.jpeg';

const SKILLS = [
  'Posters',
  'Brochures',
  'Name boards',
  "Logo design",
];

const STATS = [
  { value: 86, suffix: '+', label: 'Projects shipped' },
  { value: 42, suffix: '', label: 'Brands launched' },
  { value: 9, suffix: 'yrs', label: 'Of practice' },
];

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const yImage = useTransform(scrollYProgress, [0, 1], [40, -60]);

  return (
    <section id="about" ref={ref} className="relative py-28 md:py-36">
      <div className="container-x">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20%' }}
          variants={stagger(0.1)}
          className="grid gap-14 md:grid-cols-12 md:gap-16"
        >
          {/* Image side */}
          <motion.div
            variants={slideInLeft}
            className="relative md:col-span-5"
          >
            <motion.div
              style={{ y: yImage }}
              className="relative overflow-hidden rounded-4xl border border-ink/10 shadow-soft"
            >
              <div className="aspect-[4/5] w-full bg-gradient-to-br from-accent/70 via-accentSoft to-canvas">
                <div className="relative h-full w-full">
                  <div className="absolute inset-0 grid place-items-center">
                    <img 
                      src={logoImage} 
                      alt="Logo" 
                      className="h-2/3 w-2/3 object-contain opacity-90"
                    />
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-ink/10 bg-canvas/80 p-4 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-canvas">
                        <span className="font-display text-sm">★</span>
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-ink/55">
                          Based in
                        </p>
                        <p className="font-display text-sm font-semibold">
                          India · Remote · Worldwide
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="absolute -right-3 -top-3 hidden h-24 w-24 rotate-12 rounded-3xl border border-ink/15 bg-canvas/90 p-3 shadow-soft backdrop-blur md:block"
            >
              <div className="grid h-full w-full place-items-center rounded-2xl bg-accent text-ink">
                <span className="font-serif text-3xl italic">Hi.</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div variants={slideInRight} className="md:col-span-7">
            <motion.span variants={fadeUp} className="eyebrow">
              About
            </motion.span>

            <motion.h2 variants={fadeUp} className="section-title mt-4">
              Considered visuals for{' '}
              <span className="font-serif italic text-ink/80">brave</span> brands.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base leading-relaxed text-ink/75 md:text-lg"
            >
             I create visual identities and brand materials that help businesses stand out with clarity and purpose. My work focuses on combining clean design, strong typography, and practical communication to create designs that feel both modern and memorable.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 grid grid-cols-3 gap-4 md:max-w-md"
            >
              {STATS.map((s) => (
                <div key={s.label} className="card-soft py-5 text-left">
                  <div className="font-display text-3xl font-semibold leading-none md:text-4xl">
                    <AnimatedCounter to={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ink/55">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Animated skill badges */}
            <motion.div variants={fadeUp} className="mt-10">
              <p className="eyebrow mb-4">Toolkit & disciplines</p>
              <motion.ul
                variants={stagger(0.04)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-10%' }}
                className="flex flex-wrap gap-2"
              >
                {SKILLS.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={{
                      hidden: { opacity: 0, y: 10, scale: 0.95 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { duration: 0.5 },
                      },
                    }}
                    whileHover={{ y: -2, scale: 1.04 }}
                    className="rounded-full border border-ink/15 bg-white/55 px-4 py-2 text-sm font-medium text-ink/80 backdrop-blur transition-colors hover:border-ink hover:bg-accent hover:text-ink"
                  >
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
