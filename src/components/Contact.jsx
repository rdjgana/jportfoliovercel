import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, stagger } from '../animations/reveal';
import { CONTACT_EMAIL, LINKEDIN_URL } from '../constants/contact';

const PlusGlyph = ({ size = 20, strokeWidth = 1.4 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M10 2v16M2 10h16"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

function AmbientBackdrop() {
  const reduced = useReducedMotion();
  const loop = (vals, duration) =>
    reduced
      ? undefined
      : { animate: vals, transition: { duration, repeat: Infinity, ease: 'easeInOut' } };

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Drifting rose orb — top-left */}
      <motion.div
        {...loop({ x: [0, 24, 0], y: [0, -18, 0] }, 18)}
        className="absolute -left-32 top-10 h-[26rem] w-[26rem] rounded-full bg-accent/25 blur-[110px]"
      />
      {/* Drifting blush orb — bottom-right */}
      <motion.div
        {...loop({ x: [0, -28, 0], y: [0, 22, 0] }, 22)}
        className="absolute -right-24 bottom-0 h-[30rem] w-[30rem] rounded-full bg-accentSoft/40 blur-[120px]"
      />
      {/* Breathing accent bloom — center */}
      <motion.div
        {...loop({ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }, 14)}
        className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/15 blur-[100px]"
      />

      {/* Faint ink dot grid */}
      <div className="absolute inset-0 text-ink opacity-[0.07] [background-image:radial-gradient(currentColor_1px,transparent_1.5px)] [background-size:28px_28px]" />

      {/* Slowly rotating concentric rings (desktop only) */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute -top-8 right-[10%] hidden h-44 w-44 text-ink/15 md:block"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 7"
        />
        <circle
          cx="100"
          cy="100"
          r="60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </motion.svg>

      {/* Counter-rotating ring (left) */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute bottom-12 left-[6%] hidden h-32 w-32 text-ink/15 lg:block"
        animate={reduced ? undefined : { rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      >
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="1 5"
        />
      </motion.svg>

      {/* Floating + marks */}
      <motion.span
        {...loop({ y: [0, -10, 0], rotate: [0, 45, 90] }, 12)}
        className="absolute left-[12%] top-[22%] hidden text-ink/30 md:block"
      >
        <PlusGlyph size={22} />
      </motion.span>
      <motion.span
        {...loop({ y: [0, 12, 0], rotate: [0, -45, -90] }, 16)}
        className="absolute right-[14%] top-[44%] hidden text-ink/25 md:block"
      >
        <PlusGlyph size={16} />
      </motion.span>
      <motion.span
        {...loop({ y: [0, -8, 0], rotate: [0, 30, 60] }, 14)}
        className="absolute bottom-[18%] left-[8%] hidden text-ink/30 md:block"
      >
        <PlusGlyph size={26} strokeWidth={1.2} />
      </motion.span>
      <motion.span
        {...loop({ y: [0, 6, 0], rotate: [0, -20, -40] }, 10)}
        className="absolute right-[8%] bottom-[12%] hidden text-ink/25 lg:block"
      >
        <PlusGlyph size={14} />
      </motion.span>

      {/* Hairline that draws in on view */}
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
        className="absolute left-0 top-16 block h-px w-full origin-left bg-ink/[0.08]"
      />
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 1.8, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
        className="absolute bottom-20 right-0 block h-px w-2/3 origin-right bg-ink/[0.08]"
      />
    </div>
  );
}

function FloatingField({ id, label, type = 'text', as = 'input', value, onChange, required }) {
  const Tag = as;
  const isFilled = value && value.length > 0;

  return (
    <div className="relative">
      <Tag
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        rows={as === 'textarea' ? 5 : undefined}
        placeholder=" "
        className={`peer block w-full resize-none rounded-2xl border border-ink/15 bg-white/55 px-5 pb-3 text-base text-ink outline-none transition-all duration-300 placeholder:text-transparent focus:border-ink focus:bg-white/85 ${
          as === 'textarea' ? 'pt-7' : 'pt-7 h-[60px]'
        }`}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-5 origin-left text-ink/55 transition-all duration-300 peer-focus:top-3 peer-focus:text-xs peer-focus:font-medium peer-focus:tracking-[0.16em] peer-focus:uppercase peer-focus:text-ink/70 ${
          isFilled
            ? 'top-3 text-xs font-medium uppercase tracking-[0.16em] text-ink/70'
            : 'top-1/2 -translate-y-1/2 text-base'
        }`}
      >
        {label}
      </label>
    </div>
  );
}

const SOCIALS = [
  { label: 'LinkedIn', href: LINKEDIN_URL, glyph: 'in' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');

    const subject = encodeURIComponent(
      form.subject.trim() || `Portfolio enquiry from ${form.name.trim() || 'visitor'}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nReply-to: ${form.email}\n\n${form.message}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    setStatus('sent');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 3500);
  };

  return (
    <section id="contact" className="relative isolate overflow-hidden py-28 md:py-36">
      <AmbientBackdrop />

      <div className="container-x relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
          variants={stagger(0.08)}
          className="grid gap-14 md:grid-cols-12 md:gap-16"
        >
          {/* Left side */}
          <div className="md:col-span-5">
            <motion.span variants={fadeUp} className="eyebrow">
              Contact
            </motion.span>
            <motion.h2 variants={fadeUp} className="section-title mt-4">
              Have a brief?{' '}
              <span className="font-serif italic">Let's talk.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-md text-base leading-relaxed text-ink/70 md:text-lg"
            >
              I take on a small number of projects each quarter. Tell me a bit
              about your work and I'll reply within two business days.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 space-y-4">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex items-center gap-3 text-lg font-medium text-ink"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-canvas transition-all duration-300 group-hover:bg-accent group-hover:text-ink">
                  ✉
                </span>
                {CONTACT_EMAIL}
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-lg font-medium text-ink"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-canvas transition-all duration-300 group-hover:bg-accent group-hover:text-ink">
                  in
                </span>
                LinkedIn
              </a>
              <p className="text-sm text-ink/60">India · Remote · Worldwide</p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10">
              <p className="eyebrow mb-4">Find me on</p>
              <div className="flex flex-wrap gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group relative grid h-12 w-12 place-items-center overflow-hidden rounded-full border border-ink/15 bg-white/55 text-ink/80 transition-all duration-300 hover:border-ink hover:text-ink"
                  >
                    <span className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 group-hover:scale-y-100" />
                    <span className="relative font-display text-sm font-semibold">
                      {s.glyph}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right side - form */}
          <motion.form
            variants={fadeUp}
            onSubmit={onSubmit}
            className="md:col-span-7"
          >
            <div className="rounded-4xl border border-ink/10 bg-white/45 p-6 shadow-soft backdrop-blur md:p-10">
              <div className="grid gap-4 md:grid-cols-2">
                <FloatingField
                  id="name"
                  label="Your name"
                  value={form.name}
                  onChange={onChange}
                  required
                />
                <FloatingField
                  id="email"
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="mt-4">
                <FloatingField
                  id="subject"
                  label="What's the project?"
                  value={form.subject}
                  onChange={onChange}
                />
              </div>
              <div className="mt-4">
                <FloatingField
                  id="message"
                  label="Tell me about it"
                  as="textarea"
                  value={form.message}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-ink/55">
                  By submitting you agree to be contacted about your enquiry.
                </p>

                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-7 py-4 text-sm font-medium text-canvas transition-all duration-300 disabled:opacity-60"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-ink">
                    {status === 'idle' && 'Send message'}
                    {status === 'loading' && 'Sending…'}
                    {status === 'sent' && 'Message sent ✓'}
                    {status !== 'sent' && (
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    )}
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
