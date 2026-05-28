const ITEMS = ['Posters', 'Brochures', 'Name boards'];

export default function Marquee() {
  const loop = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="relative -my-2 overflow-hidden border-y border-ink/10 bg-ink py-6 text-canvas md:py-8">
      <div className="mask-fade-x">
        <div className="flex w-max animate-marquee items-center gap-12">
          {loop.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="inline-flex shrink-0 items-center gap-12 font-display text-3xl font-semibold tracking-tight md:text-5xl"
            >
              {item}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
