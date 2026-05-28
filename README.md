# Nuala Studio — Graphic Designer Portfolio

A single-page portfolio web app for an independent graphic designer.
Built with **React + Vite + Tailwind CSS**, animated with **Framer Motion**, and
smooth-scrolled with **Lenis**. Premium minimal aesthetic, fully responsive,
production-ready.

---

## Stack

| Concern             | Choice                          |
| ------------------- | ------------------------------- |
| App                 | React 19 + Vite 8               |
| Styling             | Tailwind CSS 3 (utility-first)  |
| Motion              | Framer Motion                   |
| Smooth scroll       | Lenis                           |
| Linting             | ESLint (react-hooks, refresh)   |

## Design system

| Token         | Value          | Usage                         |
| ------------- | -------------- | ----------------------------- |
| `canvas`      | `#FFEDFA`      | Page background               |
| `ink`         | `#000000`      | Primary text & dark UI        |
| `accent`      | `#EC7FA9`      | Animation / highlight color   |
| `accentSoft`  | `#FBC4DD`      | Soft gradients                |
| `muted`       | `#5A4F55`      | Subtle copy                   |

Type pairs: `Space Grotesk` (display), `Instrument Serif` (italic accents),
`Inter` (body).

## Folder structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── AnimatedCounter.jsx
│   ├── Marquee.jsx
│   ├── Services.jsx
│   ├── Portfolio.jsx
│   ├── Process.jsx
│   ├── Testimonials.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── ScrollProgress.jsx
│   ├── CursorGlow.jsx
│   └── Loader.jsx
├── animations/
│   ├── reveal.js          # variants: fadeUp, stagger, wordVariant…
│   └── parallax.js        # useParallax, useMagnetic, useScrollY
├── hooks/
│   ├── useLenis.js        # global smooth scrolling + anchor handling
│   └── useActiveSection.js
├── assets/
│   ├── images/
│   └── icons/
├── App.jsx
├── main.jsx
└── index.css
```

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

Production build:

```bash
npm run build
npm run preview
```

Lint:

```bash
npm run lint
```

## Sections

1. **Hero** — full-screen, parallax blobs, word-by-word headline reveal,
   magnetic CTA buttons, animated scroll indicator.
2. **About** — image + text layout, animated stat counters, hover-aware
   skill badges, parallax image.
3. **Marquee** — infinite horizontal ticker (disciplines).
4. **Services** — six-card grid with hover scale, glow, and stagger reveal.
5. **Portfolio** — bento-style masonry with category filter (`AnimatePresence`
   `popLayout`), per-card parallax background, hover overlay.
6. **Process** — vertical timeline with scroll-driven progress line,
   Research → Concept → Design → Delivery.
7. **Testimonials** — auto-rotating quote slider with manual controls.
8. **Contact** — floating-label form, animated submit, social hover states.
9. **Footer** — animated divider, scroll-to-top button.

## Global niceties

- Smooth scrolling via Lenis with anchor-link integration.
- Top scroll-progress bar (Framer Motion `useScroll` + spring).
- Subtle SVG grain overlay (mix-blend `multiply`).
- Page loader with letter reveal.
- Optional cursor glow (auto-disabled on touch devices).
- Sticky transparent navbar with active-section pill (`layoutId`) and
  responsive mobile menu.

## Coding conventions

- Functional components only.
- Tailwind utility classes; reusable components for `pill`, `btn-*`,
  `section-title`, `card-soft`, `eyebrow`.
- No inline CSS.
- Mobile-first, semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`).
- Animations are defined in `src/animations/*` so they're easy to tune.

## Customizing content

- Replace copy / project data inside each component
  (e.g. `PROJECTS` in `Portfolio.jsx`, `SERVICES` in `Services.jsx`,
  `TESTIMONIALS` in `Testimonials.jsx`).
- Swap the placeholder gradient artwork by adding real images to
  `src/assets/images/` and importing them into `Portfolio.jsx` / `About.jsx`.
- Tweak motion in `src/animations/reveal.js` (durations, easings, stagger
  distances) — every section consumes those variants.

## Deployment

The output of `npm run build` lives in `dist/` and is a fully-static SPA.
Drop it on any static host (Vercel, Netlify, Cloudflare Pages, S3 + CDN…).

---

Made with ♡ — feel free to fork, repurpose, and ship.
