import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { fadeUp, stagger } from '../animations/reveal';
import GalleryModal from './GalleryModal';
import { WORK_PROJECTS } from '../portfolio/buildWorkProjects';

const CATEGORIES = [
  'All',
  'Posters',
  'Brochures',
  'Name boards',
];

/** Real work from `src/assets` (see `portfolio/buildWorkProjects.js`). */
const PROJECTS = WORK_PROJECTS;

function ProjectCard({ project, index, onOpen }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [20, -30]);

  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen(project);
    }
  };

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{
        layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: Math.min(index * 0.06, 0.36),
      }}
      className={`group relative overflow-hidden rounded-3xl border border-ink/10 bg-white/40 ${project.span}`}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        onKeyDown={handleKey}
        aria-label={`Open ${project.title} gallery`}
        className={`relative ${project.aspect} block w-full cursor-pointer overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas`}
      >
        {/* Cover image with parallax */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 -inset-y-12 transition-transform duration-700 ease-out group-hover:scale-105"
        >
          {project.cover ? (
            <img
              src={project.cover}
              alt={`${project.title} — cover`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className={`h-full w-full bg-gradient-to-br ${project.bg}`}
            />
          )}
        </motion.div>

        {/* Readability scrim */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-ink/30" />

        <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
          <div className="flex items-start justify-between">
            <span className="rounded-full bg-canvas/85 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-ink/80 backdrop-blur">
              {project.category}
            </span>
            <span className="rounded-full bg-canvas/20 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-canvas/95 backdrop-blur">
              {project.year}
            </span>
          </div>

          <div className="flex items-end justify-between gap-3">
            <h3 className="max-w-[70%] font-display text-2xl font-semibold leading-tight tracking-tight text-canvas drop-shadow md:text-3xl">
              {project.title}
            </h3>
            <span className="rounded-full bg-canvas/85 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-ink/80 backdrop-blur">
              {project.gallery?.length || 0} plates
            </span>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 translate-y-4 px-6 pb-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:px-8 md:pb-7">
          <div className="rounded-2xl border border-canvas/20 bg-canvas/95 p-4 shadow-soft backdrop-blur-md">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-semibold leading-tight md:text-xl">
                  {project.title}
                </h3>
                <p className="text-xs text-ink/55">
                  View case study · {project.gallery?.length || 0} plates
                </p>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-canvas transition-transform duration-300 group-hover:rotate-45">
                ↗
              </span>
            </div>
          </div>
        </div>
      </button>

      {/* Caption strip below the cover */}
      <div className="px-6 py-4 md:px-7">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink/85">
            {project.client || project.title}
          </p>
          <p className="truncate text-xs text-ink/55">
            {project.scope || project.category}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const [openProject, setOpenProject] = useState(null);

  const visible = useMemo(
    () => (filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="portfolio" className="relative py-28 md:py-36">
      <div className="container-x">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
          variants={stagger(0.08)}
          className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <motion.span variants={fadeUp} className="eyebrow">
              Selected work
            </motion.span>
            <motion.h2 variants={fadeUp} className="section-title mt-4">
              Posters, brochures,{' '}
              <span className="font-serif italic">name boards.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-md text-sm text-ink/65"
            >
              Images load from your asset folders — tap a tile to browse the
              full gallery for that category.
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-2"
            role="tablist"
          >
            {CATEGORIES.map((c) => {
              const active = filter === c;
              return (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  role="tab"
                  aria-selected={active}
                  className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'border-ink bg-ink text-canvas'
                      : 'border-ink/15 bg-white/45 text-ink/75 hover:border-ink/35 hover:text-ink'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          layout
          className="grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-flow-dense lg:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={i}
                onOpen={setOpenProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <GalleryModal
        project={openProject}
        onClose={() => setOpenProject(null)}
      />
    </section>
  );
}
