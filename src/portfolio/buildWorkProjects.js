/**
 * Bundles images from `src/assets` work folders into portfolio projects.
 * Vite resolves each file to a hashed URL at build time.
 */

import mohanCateringPoster from '../assets/Posters/Mohan catering diwali poster.jpg';
import playzoPoster from '../assets/Posters/Playzo.jpg';
import karthigaiPoster from '../assets/Posters/karthigai deepam vizha 2-06.jpg';
import graductionPoster from '../assets/Posters/Graductin 10-02.jpg';

function fileNameFromPath(path) {
  return path.split(/[/\\]/).pop() ?? path;
}

function sortedUrls(modules) {
  return Object.keys(modules)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    .map((key) => modules[key]);
}

const PINNED_TOP_POSTERS = [mohanCateringPoster, playzoPoster];
const PINNED_MIDDLE_POSTERS = [karthigaiPoster, graductionPoster];
const PINNED_POSTER_FILES = new Set([
  'Mohan catering diwali poster.jpg',
  'Playzo.jpg',
  'karthigai deepam vizha 2-06.jpg',
  'Graductin 10-02.jpg',
]);

/** 1st: Mohan · 2nd: Playzo · middle: Karthigai & Graduction · rest A–Z */
function buildPosterUrls(modules) {
  const rest = Object.keys(modules)
    .filter((path) => !PINNED_POSTER_FILES.has(fileNameFromPath(path)))
    .sort((a, b) =>
      fileNameFromPath(a).localeCompare(fileNameFromPath(b), undefined, {
        sensitivity: 'base',
      })
    )
    .map((key) => modules[key]);

  const mid = Math.floor(rest.length / 2);
  return [
    ...PINNED_TOP_POSTERS,
    ...rest.slice(0, mid),
    ...PINNED_MIDDLE_POSTERS,
    ...rest.slice(mid),
  ];
}

const ASPECT_CYCLE = [
  'aspect-[3/4]',
  'aspect-[4/5]',
  'aspect-square',
  'aspect-[5/4]',
  'aspect-[16/9]',
];

function toGallery(urls) {
  return urls.map((src, i) => ({
    src,
    aspect: ASPECT_CYCLE[i % ASPECT_CYCLE.length],
    label: `Image ${i + 1}`,
  }));
}

const posterUrls = buildPosterUrls(
  import.meta.glob('../assets/Posters/*.{jpg,jpeg,png,JPG}', {
    eager: true,
    import: 'default',
  })
);
const brochureUrls = sortedUrls(
  import.meta.glob('../assets/brouchers work/*.{jpg,jpeg,png,JPG}', {
    eager: true,
    import: 'default',
  })
);
const nameBoardUrls = sortedUrls(
  import.meta.glob('../assets/Name borad design work/*.{jpg,jpeg,png,JPG}', {
    eager: true,
    import: 'default',
  })
);

function projectFromUrls({
  id,
  title,
  client,
  summary,
  scope,
  category,
  year,
  span,
  aspect,
  bg,
  glyph,
  urls,
}) {
  const list = urls || [];
  const cover = list[0] ?? null;
  const gallery = toGallery(list);
  return {
    id,
    title,
    client,
    summary,
    scope,
    category,
    year,
    span,
    aspect,
    bg,
    glyph,
    cover,
    gallery,
  };
}

export const WORK_PROJECTS = [
  projectFromUrls({
    id: 'work-posters',
    title: 'Posters',
    client: 'Events, campaigns & OOH',
    summary:
      'Poster design for festivals, retail, and seasonal campaigns — bold type, clear hierarchy, print-ready artwork.',
    scope: 'Poster · Campaign',
    category: 'Posters',
    year: 'Gallery',
    span: '',
    aspect: 'aspect-[16/10]',
    bg: 'from-[#1A1A1A] via-[#3a3a3a] to-[#EC7FA9]',
    glyph: '✺',
    urls: posterUrls,
  }),
  projectFromUrls({
    id: 'work-brochures',
    title: 'Brochures',
    client: 'Brochures & multi-page print',
    summary:
      'Brochure spreads and folded pieces — layout, imagery, and export for your printer.',
    scope: 'Brochure · Print',
    category: 'Brochures',
    year: 'Gallery',
    span: '',
    aspect: 'aspect-[4/5]',
    bg: 'from-[#FFEDFA] via-[#EC7FA9] to-[#A04E72]',
    glyph: '❒',
    urls: brochureUrls,
  }),
  projectFromUrls({
    id: 'work-nameboards',
    title: 'Name board design',
    client: 'Shopfront & venue signage',
    summary:
      'Name boards and exterior signage — readable at distance, balanced composition, files ready for fabrication.',
    scope: 'Signage · Name board',
    category: 'Name boards',
    year: 'Gallery',
    span: 'lg:col-span-3',
    aspect: 'aspect-[5/4]',
    bg: 'from-[#170611] via-[#EC7FA9] to-[#FFEDFA]',
    glyph: '▣',
    urls: nameBoardUrls,
  }),
].filter((p) => p.gallery.length > 0);
