import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const easing = [0.22, 1, 0.36, 1];

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: easing } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: easing } },
};

const panel = {
  hidden: { opacity: 0, y: 30, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: easing, delayChildren: 0.05, staggerChildren: 0.04 },
  },
  exit: { opacity: 0, y: 16, scale: 0.99, transition: { duration: 0.3, ease: easing } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: easing } },
};

function GalleryItem({ item, project, index, onOpen }) {
  return (
    <motion.figure
      variants={itemVariants}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
      className="group relative mb-4 block break-inside-avoid overflow-hidden rounded-3xl border border-ink/10 bg-white/40 md:mb-5"
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Open gallery image ${index + 1}`}
        className={`group/btn relative ${item.aspect || 'aspect-[4/5]'} block w-full cursor-zoom-in overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas`}
      >
        {item.src ? (
          <img
            src={item.src}
            alt={item.caption || `${project.title} — image ${index + 1}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${item.bg || project.bg} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
          >
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-display text-[18vw] leading-none text-canvas/15 mix-blend-overlay md:text-[10vw]">
                {item.glyph || project.glyph}
              </span>
            </div>
          </div>
        )}

        {/* Zoom indicator on hover */}
        <span className="pointer-events-none absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-canvas/90 text-ink opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M11 8v6M8 11h6" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </span>
      </button>

      {item.caption && (
        <figcaption className="px-5 py-4 md:px-6">
          <p className="text-sm font-medium text-ink/80">{item.caption}</p>
        </figcaption>
      )}
    </motion.figure>
  );
}

function Lightbox({ project, index, onClose, onPrev, onNext, onSelect }) {
  const item = project.gallery[index];
  const total = project.gallery.length;
  const [direction, setDirection] = useState(0);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    onPrev();
  }, [onPrev]);

  const handleNext = useCallback(() => {
    setDirection(1);
    onNext();
  }, [onNext]);

  const handleSelect = useCallback(
    (i) => {
      if (i === index) return;
      setDirection(i > index ? 1 : -1);
      onSelect(i);
    },
    [index, onSelect]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, handlePrev, handleNext]);

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60, scale: 0.97 }),
    center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, ease: easing } },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
      scale: 0.97,
      transition: { duration: 0.35, ease: easing },
    }),
  };

  return (
    <motion.div
      key="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: easing }}
      className="fixed inset-0 z-[80] flex flex-col bg-ink/95 backdrop-blur-2xl"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — image ${index + 1} of ${total}`}
      onClick={onClose}
    >
      {/* Top toolbar */}
      <div
        className="relative z-10 flex items-center justify-between gap-4 px-5 py-4 md:px-8 md:py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex min-w-0 items-center gap-3">
          <p className="truncate font-display text-sm font-medium text-canvas/85 md:text-base">
            {project.title}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close full view"
          className="group relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-canvas/20 bg-canvas/10 text-canvas transition-colors hover:bg-accent hover:text-ink md:h-12 md:w-12"
        >
          <span className="text-lg leading-none">✕</span>
        </button>
      </div>

      {/* Stage */}
      <div
        className="relative flex flex-1 items-center justify-center px-4 pb-2 md:px-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev */}
        {total > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous image"
            className="group absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-canvas/20 bg-canvas/10 text-canvas transition-all duration-300 hover:bg-accent hover:text-ink md:left-6 md:h-14 md:w-14"
          >
            <span className="text-xl transition-transform duration-300 group-hover:-translate-x-0.5">
              ←
            </span>
          </button>
        )}

        {/* Slide */}
        <div className="relative flex h-full w-full max-w-6xl items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.figure
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative flex h-full w-full items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {item.src ? (
                <img
                  src={item.src}
                  alt={item.caption || `${project.title} — image ${index + 1}`}
                  className="max-h-[78vh] max-w-full rounded-2xl object-contain shadow-soft md:rounded-3xl"
                />
              ) : (
                <div
                  className={`relative flex aspect-[4/5] max-h-[78vh] w-full max-w-[min(80vw,900px)] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br md:rounded-3xl ${
                    item.bg || project.bg
                  }`}
                >
                  <span className="font-display text-[28vw] leading-none text-canvas/20 mix-blend-overlay md:text-[14vw]">
                    {item.glyph || project.glyph}
                  </span>
                </div>
              )}
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Next */}
        {total > 1 && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next image"
            className="group absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-canvas/20 bg-canvas/10 text-canvas transition-all duration-300 hover:bg-accent hover:text-ink md:right-6 md:h-14 md:w-14"
          >
            <span className="text-xl transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </button>
        )}
      </div>

      {/* Bottom caption + thumbs */}
      <div
        className="relative z-10 flex flex-col gap-4 px-5 pb-5 pt-3 md:flex-row md:items-end md:justify-between md:px-8 md:pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        {item.caption ? (
          <div className="min-w-0 md:max-w-[42%]">
            <p className="max-w-2xl font-display text-lg font-medium leading-snug text-canvas md:text-xl">
              {item.caption}
            </p>
          </div>
        ) : null}

        {/* Thumbnail strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:max-w-[55%]">
          {project.gallery.map((g, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSelect(i)}
              aria-label={`Show image ${i + 1}`}
              className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 md:h-14 md:w-20 ${
                i === index
                  ? 'border-accent ring-2 ring-accent/60'
                  : 'border-canvas/15 opacity-60 hover:opacity-100'
              }`}
            >
              {g.src ? (
                <img
                  src={g.src}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div
                  className={`h-full w-full bg-gradient-to-br ${g.bg || project.bg}`}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function GalleryModal({ project, onClose }) {
  const open = Boolean(project);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const lightboxOpen = lightboxIndex !== null;

  const closeAll = useCallback(() => {
    setLightboxIndex(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape' && !lightboxOpen) closeAll();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, closeAll, lightboxOpen]);

  const total = project?.gallery?.length || 0;
  const handleLightboxPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + total) % total));
  }, [total]);
  const handleLightboxNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % total));
  }, [total]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="gallery"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[70] flex items-stretch justify-center bg-ink/60 backdrop-blur-md"
          onClick={closeAll}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} — gallery`}
        >
          <motion.div
            variants={panel}
            onClick={(e) => e.stopPropagation()}
            className="relative ml-auto flex h-full w-full flex-col overflow-hidden bg-canvas md:my-6 md:mr-6 md:max-w-[min(1280px,calc(100vw-3rem))] md:rounded-4xl md:border md:border-ink/10 md:shadow-soft"
          >
            {/* Sticky compact header */}
            <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-ink/10 bg-canvas/85 px-5 py-3 backdrop-blur-md md:px-8 md:py-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="rounded-full border border-ink/15 bg-white/55 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-ink/80 backdrop-blur">
                  {project.category} · {project.year}
                </span>
                <p className="hidden truncate font-display text-sm font-medium text-ink md:block md:text-base">
                  {project.title}
                </p>
              </div>

              <button
                onClick={closeAll}
                aria-label="Close gallery"
                className="group relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border border-ink/15 bg-white/55 text-ink transition-colors hover:bg-ink hover:text-canvas md:h-11 md:w-11"
              >
                <span className="absolute inset-0 origin-center scale-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-100" />
                <span className="relative text-base leading-none">✕</span>
              </button>
            </header>

            {/* Scrollable body */}
            <div
              className="relative grow overflow-y-auto overscroll-contain"
              data-lenis-prevent
            >
              {/* Hero "head" banner */}
              {project.cover && (
                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, ease: easing }}
                  className="relative overflow-hidden"
                >
                  <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
                    <motion.img
                      initial={{ scale: 1.06 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.1, ease: easing }}
                      src={project.cover}
                      alt={`${project.title} — cover`}
                      className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" />

                    {/* Title block overlaid */}
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: easing, delay: 0.15 }}
                      className="absolute inset-x-0 bottom-0 px-6 pb-7 md:px-12 md:pb-12"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full border border-canvas/25 bg-canvas/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-canvas/95 backdrop-blur">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                          {project.category}
                        </span>
                        <span className="rounded-full border border-canvas/25 bg-canvas/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-canvas/95 backdrop-blur">
                          {project.year}
                        </span>
                        <span className="rounded-full border border-canvas/25 bg-canvas/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-canvas/95 backdrop-blur">
                          {project.gallery?.length || 0} plates
                        </span>
                      </div>
                      <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.05] tracking-tight text-canvas md:text-6xl">
                        {project.title}
                      </h2>
                      {project.summary && (
                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-canvas/85 md:text-base">
                          {project.summary}
                        </p>
                      )}
                    </motion.div>
                  </div>
                </motion.section>
              )}

              <div className="px-6 py-10 md:px-10 md:py-14">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: easing, delay: 0.18 }}
                  className="mb-6 flex items-end justify-between gap-4 md:mb-8"
                >
                  <div>
                    <p className="eyebrow">Selected plates</p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight md:text-2xl">
                      Inside the case study
                    </h3>
                  </div>
                  <p className="hidden text-sm text-ink/55 md:block">
                    Click any plate for a closer look →
                  </p>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={panel}
                  className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [column-fill:_balance] md:gap-5"
                >
                  {project.gallery?.map((item, i) => (
                    <GalleryItem
                      key={i}
                      item={item}
                      project={project}
                      index={i}
                      onOpen={setLightboxIndex}
                    />
                  ))}
                </motion.div>

                <div className="mt-12 flex items-center justify-center">
                  <button
                    onClick={closeAll}
                    className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/55 px-5 py-3 text-sm font-medium text-ink/80 transition-colors hover:border-ink hover:text-ink"
                  >
                    <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
                      ←
                    </span>
                    <span>Back to selected work</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {lightboxOpen && (
              <Lightbox
                project={project}
                index={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
                onPrev={handleLightboxPrev}
                onNext={handleLightboxNext}
                onSelect={setLightboxIndex}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
