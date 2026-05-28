import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../animations/reveal';

const SERVICES = [
  {
    title: 'Posters',
    description:
      'Editorial posters and event collateral that turn ideas into objects worth pinning to a wall.',
    glyph: '✺',
  },
  {
    title: 'Brochures',
    description:
      'Print-ready brochures and lookbooks with clear hierarchy, strong layout, and finishes that read well in hand.',
    glyph: '❒',
  },
  {
    title: 'Name board work',
    description:
      'Shopfront and venue signage — legible type, balanced composition, and files ready for your fabricator or printer.',
    glyph: '▣',
  },
];

function ServiceCard({ service }) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
      }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white/45 p-7 shadow-soft backdrop-blur-sm transition-all duration-500 hover:border-ink/30 hover:bg-white/70 hover:shadow-glow md:p-8"
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/30 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex justify-end">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-canvas transition-all duration-500 group-hover:bg-accent group-hover:text-ink group-hover:rotate-12">
          <span className="text-lg">{service.glyph}</span>
        </span>
      </div>

      <h3 className="relative z-10 mt-6 font-display text-2xl font-semibold tracking-tight text-ink md:text-[26px]">
        {service.title}
      </h3>
      <p className="relative z-10 mt-3 text-sm leading-relaxed text-ink/70">
        {service.description}
      </p>
    </motion.article>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-28 md:py-36">
      <div className="container-x">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
          variants={stagger(0.08)}
          className="mb-16 flex flex-col items-start justify-between gap-6 md:mb-20 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <motion.span variants={fadeUp} className="eyebrow">
              Services
            </motion.span>
            <motion.h2 variants={fadeUp} className="section-title mt-4">
              What we do —{' '}
              <span className="font-serif italic">and only this.</span>
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="max-w-md text-base leading-relaxed text-ink/70"
          >
            We take on poster, brochure, and name-board projects only —
            so every job gets full attention from brief to print-ready files.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          variants={stagger(0.08)}
          className="grid gap-4 md:grid-cols-2 lg:gap-6"
        >
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
