import { AnimatePresence, motion } from 'framer-motion';

export default function Loader({ done }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-canvas"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center gap-6"
          >
            <div className="relative h-20 w-20">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 grid place-items-center font-display text-4xl"
              >
                ✦
              </motion.span>
              <motion.span
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: [0.4, 1.2, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-ink/20"
              />
            </div>

            <div className="flex h-7 overflow-hidden font-display text-base font-medium tracking-[0.2em] uppercase">
              {'Jacintha'.split('').map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{
                    duration: 0.7,
                    delay: 0.05 * i + 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {c === ' ' ? '\u00A0' : c}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-12 h-px w-40 origin-left bg-ink/50"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
