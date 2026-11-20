import { useState } from 'react';
import { Mountain } from 'lucide-react';
import { SCENIC_STRIP_SLIDES } from '../data/toursData';

function StripCard({ item }) {
  const [imgError, setImgError] = useState(false);

  return (
    <figure className="relative w-[280px] sm:w-[340px] shrink-0 overflow-hidden rounded-2xl border border-bronze/45 bg-obsidian shadow-md transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-obsidian via-pine-slate to-obsidian">
        {!imgError && item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.imageAlt}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Mountain className="h-8 w-8 text-bronze/75" strokeWidth={1.5} aria-hidden="true" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent" />

        <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white">
          <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-bronze tabular-nums">
            <span>{item.region}</span>
            <span>{item.elevation}</span>
          </div>
          <p className="mt-1 font-display text-xl font-semibold leading-tight text-white">
            {item.name}
          </p>
        </figcaption>
      </div>
    </figure>
  );
}

export default function ScenicMarquee() {
  return (
    <section
      aria-label="Northern Pakistan Scenic Panorama Strip"
      className="relative overflow-hidden border-t border-black/8 bg-alabaster py-12"
    >
      <div className="mx-auto max-w-7xl px-6 pb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-bronze">
          Alpine Horizon Reel
        </p>
        <p className="text-xs text-muted">
          Murree <span aria-hidden="true">·</span> Swat <span aria-hidden="true">·</span> Kalam{' '}
          <span aria-hidden="true">·</span> Hunza <span aria-hidden="true">·</span> Skardu{' '}
          <span aria-hidden="true">·</span> Fairy Meadows <span aria-hidden="true">·</span> Kashmir
        </p>
      </div>

      {/* Edge Gradient Fades */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-alabaster to-transparent sm:w-24"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-alabaster to-transparent sm:w-24"
      />

      {/* Continuous Marquee Track (Pauses Gently on Hover) */}
      <div className="group flex overflow-hidden select-none">
        <div className="animate-marquee flex w-max gap-5 px-2.5 group-hover:[animation-play-state:paused]">
          {[...SCENIC_STRIP_SLIDES, ...SCENIC_STRIP_SLIDES].map((slide, index) => (
            <StripCard key={`${slide.id}-${index}`} item={slide} />
          ))}
        </div>
      </div>
    </section>
  );
}
